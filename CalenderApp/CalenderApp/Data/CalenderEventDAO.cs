using CalenderApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalenderApp.Data
{
    public class CalenderEventDAO
    {
        private CalenderContext ctx;

        public CalenderEventDAO(CalenderContext ctx)
        {
            this.ctx = ctx;
        }

        public List<CalenderEvent> GetCalenderEvents()
        {
            return ctx.CalenderEvents.ToList();
        }
    }
}
