using Domain;
using FluentValidation;

namespace Application.Carts
{
    public class CartValidator : AbstractValidator<Cart>
    {
        public CartValidator()
        {
        }
    }
}