using Domain;
using FluentValidation;

namespace Application.Addresses
{
    public class AddressValidator : AbstractValidator<Address>
    {
        public AddressValidator()
        {
            RuleFor(x => x.AddressName).NotEmpty();
        }
    }
}