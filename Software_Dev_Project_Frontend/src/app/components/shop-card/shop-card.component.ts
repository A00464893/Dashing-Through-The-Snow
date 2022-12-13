import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss']
})
export class ShopCardComponent implements OnInit {

  ngOnInit(): void {
    console.log('im called first')
  }

itemsArr=[
  {
    title:'Dog',
    imgurl:'https://material.angular.io/assets/img/examples/shiba2.jpg',
    content:'Image of a dog'

  },
  {
    title:'item1',
    imgurl:'https://material.angular.io/assets/img/examples/shiba2.jpg',
    content:'Image of a dog'

  },
  {
    title:'item1',
    imgurl:'https://material.angular.io/assets/img/examples/shiba2.jpg',
    content:'Image of a dog'

  },
  {
    title:'item1',
    imgurl:'https://material.angular.io/assets/img/examples/shiba2.jpg',
    content:'Image of a dog'

  },
  {
    title:'Dog',
    imgurl:'https://material.angular.io/assets/img/examples/shiba2.jpg',
    content:'Image of a dog'

  },
  {
    title:'item1',
    imgurl:'https://material.angular.io/assets/img/examples/shiba2.jpg',
    content:'Image of a dog'

  },
  {
    title:'item1',
    imgurl:'https://material.angular.io/assets/img/examples/shiba2.jpg',
    content:'Image of a dog'

  },
  {
    title:'item1',
    imgurl:'https://material.angular.io/assets/img/examples/shiba2.jpg',
    content:'Image of a dog'

  }

]

}
