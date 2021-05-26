using Domain;
using FluentValidation;

namespace Application.ItemBundles
{
    public class ItemBundleValidator : AbstractValidator<ItemBundle>
    {
        public ItemBundleValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Price).NotEmpty();
        }
    }
}