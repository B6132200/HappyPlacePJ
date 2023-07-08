
using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace HappyPlace.Web.Extensions
{
    public static class MyExtensions
    {
        public static bool IsDateString(this string dateStr)
        {
            DateTime dateTime;
            bool result = false;
            try
            {
                result = DateTime.TryParse(dateStr, out dateTime);
            }
            catch
            {
                result = false;
            }

            return result;
        }
        public static DateTime ToDate(this string dateStr)
        {
            return DateTime.Parse(dateStr);
        }
        public static DateTime? ToDateNull(this string dateStr)
        {
            DateTime? dateTime;
            try
            {
                dateTime = DateTime.Parse(dateStr);
            }
            catch
            {
                dateTime = null;
            }

            return dateTime;
        }

        public static string ToJson(this object obj)
        {
            //var str = obj == null ? string.Empty : obj.ToString();
            var result = JsonSerializer.Serialize(obj);

            return result;
        }
    }
}
