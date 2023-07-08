using HappyPlace.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Data.UnitOfWork
{
    public interface IUnitOfWork
    {

        FloorRepository FloorRepository { get; }
        RoomRepository RoomRepository { get; }
        StatusRepository StatusRepository { get; }
        DefaultRepository DefaultRepository { get; }
        TenantRepository TenantRepository { get; }
        BookRepository BookRepository { get; }
        BillRepository BillRepository { get; }
        MonthRepository MonthRepository { get; }
        DetailCORepository DetailCORepository { get; }
        DetailExpRepository DetailExpRepository { get; }

        int Commit();
    }
}
