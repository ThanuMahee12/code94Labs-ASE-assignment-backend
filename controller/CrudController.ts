/**
 * Interface for CRUD operations.
 * This interface defines the methods required for implementing CRUD functionalities.
 * 
 * @interface CrudController
 */
interface CrudController {
    /**
     * Adds a new object to the collection.
     * @param obj - The object to be added.
     * @returns A promise resolving to the added object.
     */
    addNew: (obj: Object) => Promise<Object>;
  
    /**
     * Retrieves all objects, optionally paginated.
     * @param page - The page number for pagination (optional).
     * @returns A promise resolving to a collection of objects.
     */
    all: (page?: number) => Promise<Object>;
  
    /**
     * Finds an object by its unique identifier.
     * @param id - The unique identifier of the object.
     * @returns A promise resolving to the found object.
     */
    findById: (id: string | number) => Promise<Object>;
  
    /**
     * Deletes an object by its unique identifier.
     * @param id - The unique identifier of the object to delete.
     * @returns A promise resolving to the deleted object.
     */
    delete: (id: string | number) => Promise<Object>;
  
    /**
     * Updates an object by its unique identifier.
     * @param id - The unique identifier of the object to update.
     * @param obj - The new object data.
     * @returns A promise resolving to the updated object.
     */
    update: (id: string | number, obj: Object) => Promise<Object>;
  
    /**
     * Searches for objects matching the specified keyword.
     * @param keyword - The search keyword (optional).
     * @returns A promise resolving to the search results.
     */
    searchByKeyword: (keyword?: string | number) => Promise<Object>;
  }
  
  export default CrudController