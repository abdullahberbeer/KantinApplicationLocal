using KantinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Data.Abstract
{
   public interface IOrderRepository:IRepository<Order>
    {
        bool ExistOrder(int orderId);
        Task<Order> DeleteOrder(int orderId);

        Task<Order> GetByPersonId(int personId);

        void DeleteFromOrder(int personId);
        void ClearOrder(int orderId);

        Task<List<Order>> GetOrdersPersonelId(int personId); 
    }
}
