using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using System.Collections.Generic;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ItemBundles
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ItemBundle ItemBundle { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ItemBundle).SetValidator(new ItemBundleValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> 
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                for (var i = 0; i < request.ItemBundle.Items.Count(); i++)
                    {
                        var currentItem = request.ItemBundle.Items.ElementAt(i);

                        var possibleItem = _context.Items
                            .Where(n => n.Name == currentItem.Item.Name)
                            .FirstOrDefault();

                        if (possibleItem != null)
                        {
                            currentItem.Item = possibleItem;
                        }
                        else
                        {
                            _context.Items.Add(currentItem.Item);
                            currentItem.ItemBundleId = request.ItemBundle.ItemBundleId;
                            currentItem.ItemId = currentItem.Item.ItemId;
                            _context.BundleContents.Add(currentItem);
                        }
                    }

                for (var i = 0; i < request.ItemBundle.Categories.Count(); i++)
                    {
                        var currentCategory = request.ItemBundle.Categories.ElementAt(i);

                        var possibleCategory = _context.Categories
                            .Where(n => n.Name == currentCategory.Category.Name)
                            .FirstOrDefault();

                        if (possibleCategory != null)
                        {
                            currentCategory.Category = possibleCategory;
                        }
                        else
                        {
                            _context.Categories.Add(currentCategory.Category);
                            currentCategory.CategoryId = currentCategory.Category.CategoryId;
                            currentCategory.ItemBundleId = request.ItemBundle.ItemBundleId;
                            _context.ItemBundleCategories.Add(currentCategory);
                        }
                    }

                _context.ItemBundles.Add(request.ItemBundle);
                

                request.ItemBundle.OPTIMISTIC_LOCK_VERSION = 0;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("failed to create ItemBundle");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}