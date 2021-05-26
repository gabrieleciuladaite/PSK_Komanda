using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class List
    {
        public class Query : IRequest<Result<List<CategoryDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<CategoryDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<CategoryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var itemsToReturn = _mapper.Map<List<CategoryDto>>
                (await _context.Categories.ToListAsync());

                return Result<List<CategoryDto>>.Success(itemsToReturn);
            }
        }
    }
}