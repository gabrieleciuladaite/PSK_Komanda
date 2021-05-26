using Domain;
using FluentValidation;

namespace Application.Items
{
    public class ItemValidator : AbstractValidator<Item>
    {
        public ItemValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.WarehouseStock).NotEmpty();
        }
    }
}