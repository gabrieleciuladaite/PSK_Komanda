using System;
using System.Collections.Generic;
using Application.Addresses;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Domain;

namespace API.Controllers
{
    public class AddressController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetAddresses()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAddress(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAddress([FromBody] Address address)
        {
            return HandleResult
            (await Mediator.Send(new Create.Command {Address = address}));
        } 

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAddress(Guid id, Address address)
        {
            address.AddressId = id;
            return Ok(await Mediator.Send(new Edit.Command{Address = address}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(Guid Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id = Id}));
        }
    }
}