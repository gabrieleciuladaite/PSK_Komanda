using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.ItemBundles;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ItemBundleController : BaseApiController
    {

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetItemBundles()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemBundle(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateItemBundle([FromBody] ItemBundle ItemBundle)
        {
            return HandleResult
            (await Mediator.Send(new Create.Command {ItemBundle = ItemBundle}));
        } 

        [HttpPut("{id}")]
        public async Task<IActionResult> EditItemBundle(Guid id, ItemBundle itemBundle)
        {
            itemBundle.ItemBundleId = id;
            return Ok(await Mediator.Send(new Edit.Command{ItemBundle = itemBundle}));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemBundle(Guid Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id = Id}));
        }
    }
}