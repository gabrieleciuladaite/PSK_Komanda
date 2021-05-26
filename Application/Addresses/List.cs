using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Addresses
{
    public class List
    {
        public class Query : IRequest<Result<List<AddressDTO>>> { }

        public class Handler : IRequestHandler<Query, Result<List<AddressDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<AddressDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var addressesToReturn = _mapper.Map<List<AddressDTO>>
                (await _context.Addresses.ToListAsync());

                return Result<List<AddressDTO>>.Success(addressesToReturn);
            }
        }
    }
}