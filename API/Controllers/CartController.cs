using System;
using System.Threading.Tasks;
using Application.Carts;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {

        [AllowAnonymous]
        [HttpGet("delivered")]
        public async Task<IActionResult> GetDeliveredCarts()
        {
            return HandleResult(await Mediator.Send(new ListDelivered.Query()));
        }

        [AllowAnonymous]
        [HttpGet("shipped")]
        public async Task<IActionResult> GetShippedCarts()
        {
            return HandleResult(await Mediator.Send(new ListShipped.Query()));
        }

        [HttpGet]
        public async Task<IActionResult> GetCarts()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
    
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateCart([FromBody] Cart Cart)
        {
            return HandleResult
            (await Mediator.Send(new Create.Command {Cart = Cart}));
        } 

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCart([FromBody] Cart Cart)
        {
            return HandleResult
            (await Mediator.Send(new Edit.Command {Cart = Cart}));
        } 

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCart(Guid Id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = Id}));
        } 

    }
}