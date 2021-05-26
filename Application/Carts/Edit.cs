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
    public class Edit
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

                var currentCart = await _context.Carts.FindAsync(correctedRequest.CartId);

                if (currentCart == null ) return null;

                if (_userAccessor.checkUserToken())
                {
                    if (_cookieAccessor.getCookie() == currentCart.CartToken)
                    {
                        correctedRequest.CartToken = currentCart.CartToken;
                        correctedRequest.CartOwner = _context.Users
                            .Where(u => u.UserName == _userAccessor.GetUsername())
                            .FirstOrDefault().UserName;
                    }
                    else if (currentCart.CartOwner == _userAccessor.GetUsername()) {}
                    else
                    {
                        return Result<Unit>.Failure("Unauthorized to access the cart!");
                    }
                    
                }
                if (_cookieAccessor.getCookie() == currentCart.CartToken) 
                {
                    correctedRequest.CartToken = currentCart.CartToken;
                }

                correctedRequest.LastUsed = System.DateTime.Now;
                
                 
                var possibleCard = _context.CardDesigns.Where(i => i.Name == request.Cart.Card.Design.Name).FirstOrDefault();
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

                    var possibleItem = _context.CartItems.Where(a => a.ItembundleId == currentItem.ItembundleId
                                                                && a.CartId == currentItem.CartId)
                                    .FirstOrDefault();

                    if(possibleItem != null)
                    {
                        currentItem.ItemBundle = possibleItem.ItemBundle;
                    }
                }

                var itemsToKeep = from item in currentCart.Items select item.ItembundleId;
                var itemsToRemove = _context.CartItems.Where(i => !itemsToKeep.Contains(i.ItembundleId) 
                                                            && i.CartId == currentCart.CartId)
                                                            .ToList();

                _context.CartItems.RemoveRange(itemsToRemove);

                
                _mapper.Map(correctedRequest, currentCart);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("failed to create Cart");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}