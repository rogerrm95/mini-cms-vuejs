module.exports = {
    categoryWithChildren:`
    WITH RECURSIVE childcategory (id) AS (
        SELECT id FROM categories WHERE id = ?
        UNION ALL
        SELECT c.id FROM childcategory, categories c
        WHERE "parentId" = childcategory.id 
    )
    SELECT id FROM childcategory
    `
}