using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Addresses
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly ILogger<Handler> _logger;

            public Handler(DataContext context, ILogger<Handler> logger)
            {
                _logger = logger;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var address = await _context.Addresses.FindAsync(request.id);
                if (address == null) return null;
                _logger.LogInformation("[" + DateTime.Now.ToString() + " DELETE ADDRESS " + address.AddressName);
                _context.Remove(address);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the Address!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}