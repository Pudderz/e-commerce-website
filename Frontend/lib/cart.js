
export const AddToCart = (item,size, quantity = 1, addCartItem)=> {
    if(size == "") throw new Error("No Size Selected");
    
 
        //Work out maxStock
        let minSize = 3.5;
        let maxStock = 1;
        maxStock = (size - minSize) * 2;
        console.log(item.stock[maxStock]);
        console.log(item.price);

        //dispatch action
        addCartItem({
          id: item.id,
          name: item.name,
          slug: item.slug,
          price: item.price,
          quantity: 1,
          images: item.images,
          size: size,
          maxStock: item.stock[maxStock],
        });
    
}