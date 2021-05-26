using Application.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ItemBundle, ItemBundle>()
                .ForMember(items => items.Items, opts => opts.Ignore())
                .ForMember(categories => categories.Categories, opts => opts.Ignore())
                .ForMember(carts => carts.Carts, opts => opts.Ignore());
            CreateMap<Cart,Cart>()
                .ForMember(Items => Items.Items, opts => opts.Ignore())
                .ForMember(Card => Card.Card, opts => opts.Ignore())
                .ForMember(ShippingAddress => ShippingAddress.ShippingAddress, opts => opts.Ignore())
                .ForMember(Receiver => Receiver.Receiver, opts => opts.Ignore());
            CreateMap<Item, Item>();
            CreateMap<ItemBundle, ItemBundleDto>();
            CreateMap<BundleContents, BundleContentsDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<ItemBundleCategory, ItemBundleCategoryDto>();
            CreateMap<Item,ItemDto>();
            CreateMap<Cart,Cart>();
            CreateMap<BundleContents,BundleContents>();
            CreateMap<Cart,CartDto>();
            CreateMap<CartItem,CartItemDto>();
            CreateMap<User,UserDto>();
            CreateMap<Address,AddressDTO>();
        }
    }
}