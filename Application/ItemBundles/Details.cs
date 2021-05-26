using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Application.DTOs;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.ItemBundles
{
    public class Details
    {
        public class Query : IRequest<Result<ItemBundleDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ItemBundleDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<ItemBundleDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var itemBundle = await _context.ItemBundles
                    .Include(bc => bc.Items)
                    .ThenInclude(i => i.Item)
                    .Include(ibc => ibc.Categories)
                    .ThenInclude(c => c.Category)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync(i => i.ItemBundleId == request.Id);

                var itemBundleToReturn = _mapper.Map<ItemBundleDto>(itemBundle);

                var stock = Int32.MaxValue;

                foreach (var item in itemBundleToReturn.Items)
                {
                    if (item.Quantity == 0) continue;
                    if (stock > item.Item.WarehouseStock / item.Quantity) 
                    {
                        stock = item.Item.WarehouseStock / item.Quantity;
                    }

                }

                if (stock == Int32.MaxValue ) stock = 0;

                itemBundleToReturn.stock = stock;

                return Result<ItemBundleDto>.Success(itemBundleToReturn);
            }
        }
    }
}