using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Addresses
{
    public class Details
    {
        public class Query : IRequest<Result<AddressDTO>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<AddressDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly ILogger<Handler> _logger;
            public Handler(DataContext context, IMapper mapper, ILogger<Handler> logger)
            {
                _logger = logger;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<AddressDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var address = await _context.Addresses.FindAsync(request.Id);

                var mappedAddress = _mapper.Map<AddressDTO>(address);

                _logger.LogInformation("[" + DateTime.Now.ToString() + " GET ADDRESS " + address.AddressName);

                return Result<AddressDTO>.Success(mappedAddress);
            }
        }
    }
}