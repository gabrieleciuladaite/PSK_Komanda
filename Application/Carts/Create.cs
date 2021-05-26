using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Carts
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Cart Cart { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Cart).SetValidator(new CartValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly ICookieAccessor _cookieAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, ICookieAccessor cookieAccessor, IUserAccessor userAccessor
            , IMapper mapper)
            {
                _mapper = mapper;
                _cookieAccessor = cookieAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var correctedRequest = request.Cart;

                correctedRequest.CartId = System.Guid.NewGuid();

                correctedRequest.CartToken = _cookieAccessor.generateCookie(correctedRequest.CartId);

                if (_userAccessor.checkUserToken())
                {
                    correctedRequest.CartOwner = _context.Users
                                                .Where(u => u.UserName == _userAccessor.GetUsername())
                                                .FirstOrDefault().UserName;
                }
                correctedRequest.LastUsed = System.DateTime.Now;
                correctedRequest.Status = Status.open;

                var possibleCard = _context.CardDesigns.Where(a => a.Name == request.Cart.Card.Design.Name).FirstOrDefault();

                if (possibleCard != null)
                {
                    correctedRequest.Card.Design = possibleCard;
                    if (!correctedRequest.Card.Design.isEnabled)
                    {
                        return Result<Unit>.Failure("Card design is disabled!");
                    }

                }

                for (var i = 0; i < request.Cart.Items.Count(); i++)
                {
                    var currentItem = request.Cart.Items.ElementAt(i);

                    var possibleItem = _context.ItemBundles.Where(a => a.ItemBundleId == currentItem.ItembundleId)
                                    .FirstOrDefault();

                    if(possibleItem != null)
                    {
                        currentItem.ItemBundle = possibleItem;
                    }
                    else
                    {
                        request.Cart.Items.Remove(currentItem);
                    }
                }

                _context.Carts.Add(correctedRequest);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("failed to create Cart");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}