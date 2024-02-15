import { Component } from '@angular/core';
import { ProductContract } from './product-contract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public products:ProductContract[] = [];
  public categories:string[] = [];
  public cartItems:ProductContract[] =[];
  public cartItemsCount:number = 0;
  public isCartVisible:boolean = false;

  public LoadProducts(url:string):void{
    fetch(url)
    .then(data=>data.json())
    .then(data=>{ 
      this.products = data;
    })
  }

  public CartItemsCount():void{
    this.cartItemsCount = this.cartItems.length;
  }

  public LoadCategories():void{
    fetch('https://fakestoreapi.com/products/categories')
    .then(data=>data.json())
    .then(data=>{
      this.categories = data;
    })
  }

  ngOnInit():void{
    this.LoadCategories();
    this.LoadProducts('https://fakestoreapi.com/products');
    this.CartItemsCount();
  }

  CategoryChanged(categoryName:string){
    if(categoryName == "all"){
      this.LoadProducts('https://fakestoreapi.com/products')
    }
    else{
      this.LoadProducts('https://fakestoreapi.com/products/category/'+categoryName);
    }
  }

  ToggleCart(){
    this.isCartVisible = this.isCartVisible == true ? false : true;
  }

  RemoveCartItem(index:number){
    var flag=confirm('Are you sure you want to Delete?')
    if(flag==true){
      this.cartItems.splice(index,1);
      this.CartItemsCount();
    }
  }
  AddtoCart(id:number){
    fetch('https://fakestoreapi.com/products/'+id)
    .then(data=>data.json())
    .then(data=>{
      this.cartItems.push(data);
      this.CartItemsCount();
    })
  }

}