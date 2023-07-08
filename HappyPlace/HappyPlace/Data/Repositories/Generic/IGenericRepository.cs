using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HappyPlace.Data.Repositories.Generic
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        TEntity GetById(int id);
        TEntity GetSingleByCondition(Expression<Func<TEntity, bool>> expression, string[] includes = null, bool disableTracking = true);
        IQueryable<TEntity> GetMulti(Expression<Func<TEntity, bool>> predicate, string[] includes = null, bool disableTracking = true);
        IQueryable<TEntity> GetAll(string[] includes = null, bool disableTracking = true);
        IQueryable<TEntity> GetMultiPaging(Expression<Func<TEntity, bool>> predicate, out int total, int index = 0, int size = 20, string[] includes = null, bool disableTracking = true);
        void Update(TEntity entity);
        void Insert(TEntity entity);
        void Delete(TEntity entity);
        bool ExecuteSQL(string query);
    }
}
