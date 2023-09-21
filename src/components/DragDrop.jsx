import React, { useState, useRef, useEffect } from "react";

function DragDrop({data}) {
    const [list, setList] = useState(data)
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
      setList(data);
      init();
    }, [setList, data])
    

    const dragItem = useRef()
    const dragNode = useRef()


    const handleDragStart = (e, params) => {
        //console.log('drag starting...', params)
        dragNode.current = e.target
        dragNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = params
        setTimeout(() => {
            setDragging(true)
        }, 0);
    }

    const handleDragEnter = (e, params) => {
        //console.log('entering drag...', params);
        const currentItem = dragItem.current;
        if (dragNode.current !== e.target) {
            //console.log("TARGET IS NOT THE SAME!");
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[params.groupItem].items.splice(params.itemI, 0, newList[currentItem.groupItem].items.splice(currentItem.itemI,1)[0])
                dragItem.current = params
                return newList
            })
        }
    } 

    const handleDragEnd = () => {
        //console.log('drag ending...')
        setDragging(false)
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null
        dragNode.current = null
    }

    const getStyles = (params) => {
        if (dragItem.current.groupItem === params.groupItem && dragItem.current.itemI === params.itemI) {
            return 'dnd-item current'
        }
        return 'dnd-item'
    }


    const init = function() {
        document.addEventListener('touchstart', handler, true);
        document.addEventListener('touchmove', handler, true);
        document.addEventListener('touchend', handler, true);
        document.addEventListener('touchcancel', handler, true);        
    };
    
    const handler = function(event) {
        const touch = event.changedTouches[0],
            simulatedEvent = document.createEvent('MouseEvent');
    
        simulatedEvent.initMouseEvent(
             { touchstart: 'mousedown', touchmove: 'mousemove', touchend: 'mouseup' } [event.type],
             true, true, window, 1, 
             touch.screenX, touch.screenY, touch.clientX, touch.clientY,
             false, false, false, false, 0, null);
    
        touch.target.dispatchEvent(simulatedEvent);
        event.preventDefault()
    };

    return (
        <>
        <h1 className="app-title">Meal Tracker</h1>
        <div className="drag-n-drop">
          {list.map((group, groupItem) => (
            <div 
            key={group.title} 
            className="dnd-group"
            onDragEnter={dragging && !group.items.length ? (e) => handleDragEnter(e, {groupItem, itemI: 0}) : null}>
              <div className="group-title">{group.title}</div>
              {group.items.map((item, itemI) => (
                <div 
                draggable
                className={dragging ? getStyles({groupItem, itemI}) : "dnd-item"}
                onDragStart={(e) => {handleDragStart(e, {groupItem, itemI})}}
                onDragEnter={dragging ? (e) => {handleDragEnter(e, {groupItem, itemI})}:null} 
                key={itemI} 
                >
                  <span>{item.id}</span>
                  <img src={item.url} alt={item.id} />
                </div>
              ))}
            </div>
          ))}
        </div>
        </>
    )
}

export default DragDrop