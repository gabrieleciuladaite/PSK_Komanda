using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Categories
{
    public class Details
    {
        public class Query : IRequest<Result<CategoryDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CategoryDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<CategoryDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories.FindAsync(request.Id);

                var mappedCategory = _mapper.Map<CategoryDto>(category);

                return Result<CategoryDto>.Success(mappedCategory);
            }
        }
    }
}