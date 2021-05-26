using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ItemBundles
{
    public class List
    {
        public class Query : IRequest<Result<List<ItemBundleDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ItemBundleDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ItemBundleDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var itemBundles = await _context.ItemBundles
                    .Include(bc => bc.Items)
                    .ThenInclude(i => i.Item)
                    .Include(ibc => ibc.Categories)
                    .ThenInclude(c => c.Category)
                    .AsSplitQuery()
                    .ToListAsync();

                var itemBundlesToReturn = _mapper.Map<List<ItemBundleDto>>(itemBundles);

                foreach (var itembundle in itemBundlesToReturn)
                {
                    var stock = Int32.MaxValue;

                    foreach (var item in itembundle.Items)
                    {
                        if (item.Quantity == 0) continue;
                        if (stock > item.Item.WarehouseStock / item.Quantity) 
                        {
                            stock = item.Item.WarehouseStock / item.Quantity;
                        }
                    }

                    if (stock == Int32.MaxValue ) stock = 0;

                    itembundle.stock = stock;
                }

                return Result<List<ItemBundleDto>>.Success(itemBundlesToReturn);
            }
        }
    }
}