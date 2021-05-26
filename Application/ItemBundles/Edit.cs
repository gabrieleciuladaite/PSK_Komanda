using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ItemBundles
{
    public class Edit
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var itemBundle = await _context.ItemBundles.FindAsync(request.ItemBundle.ItemBundleId);

                if (itemBundle == null) return null;

                if (request.ItemBundle.OPTIMISTIC_LOCK_VERSION == itemBundle.OPTIMISTIC_LOCK_VERSION)
                {
                    request.ItemBundle.OPTIMISTIC_LOCK_VERSION += 1;

                    for (var i = 0; i < request.ItemBundle.Items.Count(); i++)
                    {
                        var currentItem = request.ItemBundle.Items.ElementAt(i);

                        var possibleContents = _context.BundleContents
                            .Where(n => n.ItemBundleId == request.ItemBundle.ItemBundleId
                                    && n.Item.Name == currentItem.Item.Name)
                            .FirstOrDefault();

                        if (possibleContents != null)
                        {
                            possibleContents.Quantity = currentItem.Quantity;
                            currentItem = possibleContents;
                        }
                        else
                        {
                            _context.Items.Add(currentItem.Item);
                            currentItem.ItemBundleId = request.ItemBundle.ItemBundleId;
                            currentItem.ItemId = currentItem.Item.ItemId;
                            _context.BundleContents.Add(currentItem);
                        }
                    }

                    var itemsToKeep = from item in request.ItemBundle.Items select item.ItemId;
                    var itemsToRemove = _context.BundleContents.Where(i => !itemsToKeep.Contains(i.ItemId)
                                                                    && i.ItemBundleId == request.ItemBundle.ItemBundleId)
                                                                    .ToList();
                                                                    
                    _context.BundleContents.RemoveRange(itemsToRemove);

                    for (var i = 0; i < request.ItemBundle.Categories.Count(); i++)
                    {
                        var currentCategory = request.ItemBundle.Categories.ElementAt(i);

                        var possibleItemBundleCategory = _context.ItemBundleCategories
                            .Where(n => n.ItemBundleId == request.ItemBundle.ItemBundleId
                                    && n.Category.Name == currentCategory.Category.Name)
                            .FirstOrDefault();

                        if (possibleItemBundleCategory != null)
                        {
                            currentCategory = possibleItemBundleCategory;
                        }
                        else
                        {
                            _context.Categories.Add(currentCategory.Category);
                            currentCategory.CategoryId = currentCategory.Category.CategoryId;
                            currentCategory.ItemBundleId = request.ItemBundle.ItemBundleId;
                            _context.ItemBundleCategories.Add(currentCategory);
                        }
                    }

                    var categoriesToKeep = from category in request.ItemBundle.Categories select category.CategoryId;
                    var categoriesToRemove = _context.ItemBundleCategories.Where(i => !categoriesToKeep.Contains(i.CategoryId)
                                                                                 && i.ItemBundleId == request.ItemBundle.ItemBundleId)
                                                                                .ToList();

                    _mapper.Map(request.ItemBundle, itemBundle);

                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result)
                    {
                        request.ItemBundle.OPTIMISTIC_LOCK_VERSION -= 1;
                        return Result<Unit>.Failure("Failed to find Itembundle");
                    } 

                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("OPTIMISTIC_LOCK_PROBLEM: " + itemBundle.OPTIMISTIC_LOCK_VERSION);
            }
        }
    }
}