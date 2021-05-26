using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Addresses
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Address Address { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Address).SetValidator(new AddressValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly ILogger<Handler> _logger;
            public Handler(DataContext context, IUserAccessor userAccessor, ILogger<Handler> logger)
            {
                _logger = logger;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (_userAccessor.checkUserToken())
                {
                    _logger.LogInformation("[" + DateTime.Now.ToString() + "] CREATE ADDRESS " + request.Address.AddressName);
                    request.Address.UserId = _context.Users.Where(u => u.UserName == _userAccessor.GetUsername()).FirstOrDefault().Id;
                    _context.Addresses.Add(request.Address);

                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result<Unit>.Failure("failed to create Category");

                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("User Token missing!");
            }
        }
    }
}