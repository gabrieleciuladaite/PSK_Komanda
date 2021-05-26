using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Addresses
{
    public class Edit
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
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            private readonly ILogger<Handler> _logger;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, ILogger<Handler> logger)
            {
                _logger = logger;
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var adr = await _context.Addresses.ToListAsync();

                var address = adr.FirstOrDefault();

                if (address == null) return null;

                address.AddressName = request.Address.AddressName;
                address.AddressNumber = request.Address.AddressNumber;
                address.ApartmentNumber = request.Address.ApartmentNumber;
                address.City = request.Address.City;
                address.Notes = request.Address.Notes;
                address.PostCode = request.Address.PostCode;
                address.Street = request.Address.Street;
                address.User = _context.Users.Where(a => a.UserName == _userAccessor.GetUsername()).FirstOrDefault();

                var result = await _context.SaveChangesAsync() > 0;

                _logger.LogInformation("[" + DateTime.Now.ToString() + " EDIT ADDRESS " + address.AddressName);

                if (!result) return Result<Unit>.Failure("Failed to find Address");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}