using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Carts
{
    public class ListShipped
    {
        public class Query : IRequest<Result<List<CartDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<CartDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
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
                    .Where(s => s.Status == Status.shipped)
                    .ToListAsync();

                var cartsToReturn = _mapper.Map<List<CartDto>>(carts);

                return Result<List<CartDto>>.Success(cartsToReturn);
            }
        }
    }
}