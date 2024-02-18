//fix or add:
//better shadow
//turn page while scrolling

import { useRef, useState, useEffect } from 'react';

import classes from './css/BookLayout.module.css';
import cx from 'classnames';
import kopftuch from '../assets/Kopftuch/kopftuch.jsx';

const BookLayout = () => {
  const [curPage, setCurPage] = useState(1);
  const book = useRef(null);

  useEffect(() => {
    if (curPage < 0) return;
    for (let index = 0; index < kopftuch.length / 2; index++) {
      if (index < curPage) {
        const target = book.current.children[index];
        target.classList.add(classes['flipped']);
        target.style.zIndex = Math.abs(target.style.zIndex);
      } else {
        const target = book.current.children[index];
        target.classList.remove(classes['flipped']);
        target.style.zIndex = Math.abs(target.style.zIndex) * -1;
      }
    }
  }, [curPage]);

  const turnPage = (e) => {
    const zIndex = e.target.closest(`.${classes['page']}`).style.zIndex;
    if (Math.abs(zIndex) > curPage + 1 || Math.abs(zIndex) < curPage) return;
    console.log(zIndex);
    setCurPage((p) => {
      if (p - Math.sign(zIndex) < 0) return p;
      return p - Math.sign(zIndex);
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10rem',
        transform: 'rotatex(8deg) rotatey(-12deg)',
        perspective: '5000px',
      }}
    >
      <div
        className={cx(classes['book_container'])}
        style={{
          width: '25vw',
          // height: '50vh',
          aspectRatio: '1/1.41',

          position: 'relative',
          transform: 'translate(50%, 0%) ',
          // transform: 'translate(50%, 0%) rotatex(12deg) rotatey(-8deg)',
          transformStyle: 'preserve-3d',
        }}
        ref={book}
      >
        {kopftuch.map((item, index, list) => {
          if (index + 1 > list.length / 2) {
            return;
          }
          // console.log(index);
          // console.log(index === list.length / 2 - 1);

          return (
            <div
              key={index}
              onClick={turnPage}
              className={cx(classes['page'])}
              style={{
                userSelect: 'none',
                width: '100%',
                height: '100%',
                position: 'absolute',
                right: '0',
                zIndex: `${(index + 1) * -1}`,
                transform: `translateZ(${(index + 1) * -1})`,

                boxShadow:
                  (index === 0 || index === list.length / 2 - 1) &&
                  '5px 0px 33px -5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div
                className={cx(
                  classes['content'],
                  classes['content-right'],
                  classes['front']
                )}
                style={{ background: '#ffffff' }}
              >
                <img
                  src={kopftuch[index * 2]}
                  alt=""
                  className={cx(
                    classes['content-image'],
                    classes['image-first']
                  )}
                  style={{ height: '85%', borderRadius: '10px' }}
                />
              </div>
              <div
                className={cx(
                  classes['content'],
                  classes['content-left'],
                  classes['back']
                )}
                style={{ background: '#ffffff' }}
              >
                <img
                  src={kopftuch[index * 2 + 1]}
                  alt=""
                  className={cx(
                    classes['content-image'],
                    classes['image-second']
                  )}
                  style={{
                    height: '85%',
                    borderRadius: '10px',
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* <div
          onClick={turnPage}
          className={cx(classes['page'])}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            right: '0',
            zIndex: flipped ? '1' : '-1',
          }}
        >
          <div
            className={cx(classes['content'], classes['front'])}
            style={{ background: '#080606' }}
          >
            <img src={kopftuch[0]} alt="" style={{ height: '100%' }} />
          </div>
          <div
            className={cx(classes['content'], classes['back'])}
            style={{ background: '#a7372c' }}
          >
            <img src={kopftuch[0]} alt="" style={{ height: '100%' }} />
          </div>
        </div>
        <div
          onClick={turnPage}
          className={cx(classes['page'])}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            right: '0',
            zIndex: flipped2 ? '2' : '-2',
          }}
        >
          <div
            className={cx(classes['content'], classes['front'])}
            style={{ background: '#bb9f59' }}
          >
            <img src={kopftuch[1]} alt="" style={{ height: '100%' }} />
          </div>
          <div
            className={cx(classes['content'], classes['back'])}
            style={{ background: '#32312f' }}
          >
            <img src={kopftuch[2]} alt="" style={{ height: '100%' }} />
          </div>
        </div>
        <div
          onClick={turnPage}
          className={cx(classes['page'])}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            right: '0',
            zIndex: flipped3 ? '3' : '-3',
          }}
        >
          <div
            className={cx(classes['content'], classes['front'])}
            style={{ background: '#bb9f59' }}
          >
            <img src={kopftuch[3]} alt="" style={{ height: '100%' }} />
          </div>
          <div
            className={cx(classes['content'], classes['back'])}
            style={{ background: '#32312f' }}
          >
            <img src={kopftuch[4]} alt="" style={{ height: '100%' }} />
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default BookLayout;
