using System;
using System.Collections.Generic;
using Application.Categories;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Domain;

namespace API.Controllers
{
    public class CategoryController : BaseApiController
    {

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] Category category)
        {
            return HandleResult
            (await Mediator.Send(new Create.Command {Category = category}));
        } 

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCateogory(Guid id, Category category)
        {
            category.CategoryId = id;
            return Ok(await Mediator.Send(new Edit.Command{Category = category}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id = Id}));
        }
    }
}