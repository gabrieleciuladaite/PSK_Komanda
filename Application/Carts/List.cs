using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Carts
{
    public class List
    {
        public class Query : IRequest<Result<List<CartDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<CartDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<CartDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var carts = await _context.Carts
                    .Include(a => a.ShippingAddress)
                    .Include(r => r.Receiver)
                    .Include(ci => ci.Items)
                    .ThenInclude(ib => ib.ItemBundle)
                    .Where(s => s.CartOwner == _userAccessor.GetUsername())
                    .ToListAsync();

                var cartsToReturn = _mapper.Map<List<CartDto>>(carts);

                return Result<List<CartDto>>.Success(cartsToReturn);
            }
        }
    }
}