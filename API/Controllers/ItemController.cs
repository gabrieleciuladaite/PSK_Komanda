using System;
using System.Threading.Tasks;
using Application.Items;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ItemController : BaseApiController
    {

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] Item Item)
        {
            return HandleResult
            (await Mediator.Send(new Create.Command {Item = Item}));
        } 

        [HttpPut("{id}")]
        public async Task<IActionResult> EditItem(Guid id, Item Item)
        {
            Item.ItemId = id;
            return Ok(await Mediator.Send(new Edit.Command{Item = Item}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id = Id}));
        }
    }
}