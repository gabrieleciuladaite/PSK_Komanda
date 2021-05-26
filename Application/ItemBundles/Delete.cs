using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;
using System.Collections.Generic;

namespace Application.ItemBundles
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
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var itemBundle = await _context.ItemBundles.FindAsync(request.id);
                if (itemBundle == null) return null;
                _context.RemoveRange(itemBundle.Items);
                _context.RemoveRange(itemBundle.Categories);
                _context.Remove(itemBundle);
                
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the ItemBundle");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}