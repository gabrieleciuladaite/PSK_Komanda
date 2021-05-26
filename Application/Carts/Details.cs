using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Application.DTOs;
using AutoMapper;
using MediatR;
using Persistence;
using Application.Interfaces;
using Domain;

namespace Application.Carts
{
    public class Details
    {
        public class Query : IRequest<Result<CartDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CartDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly ICookieAccessor _cookieAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper,
            ICookieAccessor cookieAccessor, IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
                _cookieAccessor = cookieAccessor;
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }

        public async Task<Result<CartDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var cart = new Cart();

            if (_userAccessor.checkUserToken())
            {
                cart = await _context.Carts
                    .Include(a => a.ShippingAddress)
                    .Include(r => r.Receiver)
                    .Include(ci => ci.Items)
                    .ThenInclude(i =>i.ItemBundle)
                    .ThenInclude(bc => bc.Items)
                    .ThenInclude(i => i.Item)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync(u => u.CartOwner == _userAccessor.GetUsername()
                                         && u.CartId == request.Id);               
            }

            if (_cookieAccessor.getCookie() != null)
            {
                cart = await _context.Carts
                    .Include(a => a.ShippingAddress)
                    .Include(r => r.Receiver)
                    .Include(ci => ci.Items)
                    .ThenInclude(i =>i.ItemBundle)
                    .ThenInclude(bc => bc.Items)
                    .ThenInclude(i => i.Item)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync(u => u.CartToken == _cookieAccessor.getCookie()
                                         && u.CartId == request.Id);
            }

            var cartToReturn = _mapper.Map<CartDto>(cart);

            return Result<CartDto>.Success(cartToReturn);
        }
    }
}
}