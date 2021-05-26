using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Items
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Item Item { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Item).SetValidator(new ItemValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> 
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Items.Add(request.Item);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("failed to create Item");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}