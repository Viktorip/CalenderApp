using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CalenderApp.Data;
using CalenderApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalenderApp.Controllers
{
    [Route("api/calenderevents")]
    [ApiController]
    public class CalenderEventController : ControllerBase
    {
        private CalenderEventDAO dao;

        public CalenderEventController(CalenderEventDAO dao)
        {
            this.dao = dao;
        }

        [HttpGet]
        public List<CalenderEvent> GetAllCalenderEvents()
        {
            return dao.GetCalenderEvents();
        }

        [HttpGet("{id}")]
        public CalenderEvent GetCalenderEventById(int id)
        {
            return dao.GetCalenderEventById(id);
        }

        
        [HttpGet("userid/{id}")]
        public List<CalenderEvent> GetCalenderEventsByUserId(int id)
        {
            List<CalenderEvent> cel = dao.GetCalenderEventsByUserId(id);
            return cel;
        }

        [HttpPost]
        [Route("getbydate")]
        public List<CalenderEvent> GetAllCalenderEventsByDate([FromBody] DateTime dt)
        {
            List<CalenderEvent> cel = dao.GetCalenderEventsByDate(dt);
            return cel;
        }

        [HttpPost]
        [Route("create")]
        public CalenderEvent CreateNewCalenderEvent([FromBody] CalenderEvent ce)
        {
            CalenderEvent nce = dao.CreateCalenderEvent(ce);
            return nce;
        }
    }
}