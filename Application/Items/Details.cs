using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Items
{
    public class Details
    {
        public class Query : IRequest<Result<ItemDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ItemDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<ItemDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var item = await _context.Items.FindAsync(request.Id);

                var mappedItem = _mapper.Map<ItemDto>(item);

                return Result<ItemDto>.Success(mappedItem);
            }
        }
    }
}