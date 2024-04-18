



import { _decorator, Component, Node, Vec3, Animation } from 'cc';
const { ccclass, property } = _decorator;





@ccclass('animationLogic')
export class animationLogic extends Component {

    private isAnimating : boolean = false ;
    


    start() {
        let cards = this.node.getChildByName('Cards') ;
        console.log( "cards  " , cards  ) ; 
        for(let i=0; i<cards.children.length; i++)
        {
            let childCard = cards.children[i] ;
            childCard.active = false ;
            // childCard.
        }
        this.cardsLogic() ;
    }

    update(deltaTime: number) 
    {
        if( this.isAnimating )
        {
            this.cardsLogic() ; 
        }
    }




    // // // Using scheduleOnce function => set position height , activation and deactivation and timing to activate and deactivate 
    // // // Using scheduleOnce function => set position height , activation and deactivation and timing to activate and deactivate 

    // cardsLogic()
    // {
    //     console.log( " cards postion ==>  " ) ;
    //     this.isAnimating = false ; 
    //     let cards = this.node.getChildByName('Cards') ;
    //     let childrenCount = cards.children.length ;  
    //     for(let i=0; i<childrenCount; i++)
    //     {
    //         let childCard = cards.children[i] ;
    //         let childCardAnimation = childCard.getComponent(Animation) ;
    //         childCard.setPosition( new Vec3 (  150 * (i+1) ,  i%2==0 ? 0 : -60    , 0) )

    //         this.scheduleOnce( () =>{
    //             childCard.active = true ; 
    //             childCardAnimation.play( i%2==0 ? 'flipCard' : 'backCardOnly') ;
    //         } , (i+1) ) ;
    //     }

    //     this.scheduleOnce( () =>{
    //         for(let i=childrenCount-1 ; i>=0; i--)
    //         {
    //             let childCard = cards.children[i] ;
    //             let childCardAnimation = childCard.getComponent(Animation) ;
    //             this.scheduleOnce( () =>{
    //                 childCardAnimation.play('disappear') ;
    //                 childCardAnimation.on(Animation.EventType.FINISHED, () => {
    //                     // childCard.active = false; // Deactivate the card after the animation finishes
    //                     // childCard.setPosition( new Vec3 (  0 ,  0  , 0) )               
    //                 });
    //             } , (childrenCount - i) ) ;
    //         }
    //     } , childrenCount+1 ) ;
    //     this.scheduleOnce(() => {
    //         this.isAnimating = true ; 
    //     }, 2*childrenCount + 2); 
    // }
    
    
   







    // // //  Using animation events like On Finish and Off Finish    events ( not use scheduleOnce function )
    // // //  Using animation events like On Finish and Off Finish    events ( not use scheduleOnce function )
    // // //  Using animation events like On Finish and Off Finish    events ( not use scheduleOnce function )

    cardsLogic()
    {
        console.log( " cards postion ==>  " ) ;
        this.isAnimating = false ; 
        let cards = this.node.getChildByName('Cards') ;
        let childrenCount = cards.children.length ;  

        // // call for activation andf flip cards
        this.cardActivation( 0 , childrenCount , cards) ;
        // this.cardDeactivation( childrenCount -1 , childrenCount , cards) ;

    }
    cardActivation(index: number, childrenCount: number, cards: Node): void {
        console.log("activation  =>  ", index);
        if (index == childrenCount) {
            this.cardDeactivation(childrenCount - 1, childrenCount, cards);
            return;
        }
        let childCard = cards.children[index];
        let childCardAnimation = childCard.getComponent(Animation);
        childCard.setPosition(new Vec3(150 * (index + 1), index % 2 == 0 ? 0 : -60, 0))
        childCard.active = true;
        childCardAnimation.play(index % 2 == 0 ? 'flipCard' : 'backCardOnly');
        // Attach the 'finished' event listener only once
        let finishedCallback = () => {
            this.cardActivation(index + 1, childrenCount, cards);
            childCardAnimation.off(Animation.EventType.FINISHED, finishedCallback, this); // Remove the event listener after it's been triggered
        };
        childCardAnimation.on(Animation.EventType.FINISHED, finishedCallback, this);
    }
    cardDeactivation(index: number, childrenCount: number, cards: Node): void {
        console.log("deactivation  =>  ", index);
        if (index < 0) 
        {
            this.isAnimating = true ;
            return;
        }
        let childCard = cards.children[index];
        let childCardAnimation = childCard.getComponent(Animation);
        childCardAnimation.play('disappear');
        // Attach the 'finished' event listener only once
        let finishedCallback = () => {
            childCard.setPosition(new Vec3(0, 0, 0));
            this.cardDeactivation(index - 1, childrenCount, cards);
            childCardAnimation.off(Animation.EventType.FINISHED, finishedCallback, this); // Remove the event listener after it's been triggered
        };
        childCardAnimation.on(Animation.EventType.FINISHED, finishedCallback, this);
    }
    


}






























