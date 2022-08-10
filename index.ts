import './style.css';

import { fromEvent } from 'rxjs';
import { concatAll, map, takeUntil } from 'rxjs/operators';

const dragDom = document.getElementById('drag');
const body = document.body;
console.log('dragDom: ', dragDom);

const mousedown = fromEvent(dragDom, 'mousedown');
const mouseup = fromEvent(body, 'mouseup');
const mousemove = fromEvent(body, 'mousemove');

mousedown
  .pipe(
    map((e: MouseEvent) => mousemove.pipe(takeUntil(mouseup))),
    concatAll(),
    map((x: MouseEvent) => ({ x: x.clientX, y: x.clientY }))
  )
  .subscribe((pt) => {
    console.log('pt: ', pt);
    dragDom.style.left = pt.x + 'px';
    dragDom.style.top = pt.y + 'px';
  });
