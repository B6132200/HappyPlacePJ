using HappyPlace.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HappyPlace.Data.Repositories.Generic
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<TEntity> _dbset;
        public GenericRepository(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _dbset = _context.Set<TEntity>();
        }
        public TEntity GetById(int id)
        {
            return _dbset.Find(id);
        }
        public TEntity GetSingleByCondition(Expression<Func<TEntity, bool>> expression, string[] includes = null, bool disableTracking = true)
        {
            IQueryable<TEntity> set;
            if (disableTracking)
            {
                set = _dbset.AsNoTracking();
            }
            else
            {
                set = _dbset;
            }
            if (includes != null && includes.Count() > 0)
            {
                var query = set.Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                return query.FirstOrDefault(expression);
            }
            return set.FirstOrDefault(expression);
        }
        public virtual IQueryable<TEntity> GetMulti(Expression<Func<TEntity, bool>> predicate, string[] includes = null, bool disableTracking = true)
        {
            IQueryable<TEntity> set;
            if (disableTracking)
            {
                set = _dbset.AsNoTracking();
            }
            else
            {
                set = _dbset;
            }



            if (includes != null && includes.Count() > 0)
            {
                var query = set.Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                return query.Where<TEntity>(predicate).AsQueryable<TEntity>();
            }



            return set.Where<TEntity>(predicate).AsQueryable<TEntity>();
        }



        public IQueryable<TEntity> GetAll(string[] includes = null, bool disableTracking = true)
        {
            IQueryable<TEntity> set;
            if (disableTracking)
            {
                set = _dbset.AsNoTracking();
            }
            else
            {
                set = _dbset;
            }



            if (includes != null && includes.Count() > 0)
            {
                var query = set.Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                return query.AsQueryable();
            }



            return set.AsQueryable();
        }
        public virtual IQueryable<TEntity> GetMultiPaging(Expression<Func<TEntity, bool>> predicate, out int total, int index = 0, int size = 20, string[] includes = null, bool disableTracking = true)
        {
            IQueryable<TEntity> set;



            if (disableTracking)
            {
                set = _dbset.AsNoTracking();
            }
            else
            {
                set = _dbset;
            }



            int skipCount = index * size;
            IQueryable<TEntity> _resetSet;



            if (includes != null && includes.Count() > 0)
            {
                var query = set.Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                _resetSet = predicate != null ? query.Where<TEntity>(predicate).AsQueryable() : query.AsQueryable();
            }
            else
            {
                _resetSet = predicate != null ? set.Where<TEntity>(predicate).AsQueryable() : set.AsQueryable();
            }



            _resetSet = skipCount == 0 ? _resetSet.Take(size) : _resetSet.Skip(skipCount).Take(size);
            total = _resetSet.Count();
            return _resetSet.AsQueryable();
        }



        public void Insert(TEntity entity)
        {
            _dbset.Add(entity);
        }



        public void Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }
        public void Delete(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Deleted;
        }



        public bool ExecuteSQL(string query)
        {
            return _context.Database.ExecuteSqlRaw(query) > 0;
        }
    }
}
