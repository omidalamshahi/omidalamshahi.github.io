import { useRef, useState, useEffect } from 'react';

import classes from './css/BookLayout2.module.css';
import cx from 'classnames';

const BookLayout = () => {
  const page = useRef();
  const page2 = useRef();

  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([
    '#1f4e3e',
    '#a7372c',
    '#bb9f59',
    '#32312f',
  ]);

  const [flipped, setFlipped] = useState(false);
  const [flipped2, setFlipped2] = useState(false);
  const turnPage = (event) => {
    console.log(event);
    setFlipped((p) => !p);
  };
  const turnPage2 = () => {
    setFlipped2((p) => !p);
  };

  useEffect(() => {
    // requestAnimationFrame(() => {});
  }, []);

  // if position at left => left,back(flipped)
  // if position at right => right,front(!flipped)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5rem',
      }}
    >
      <div
        className={cx(classes['book_container'])}
        style={{
          width: '15rem',
          height: '25rem',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          transform: 'translate(50%, 50%) rotatex(8deg) rotatey(-8deg)',
          // transform: 'translate(50%, 50%)',
          transformStyle: 'preserve-3d',
        }}
      >
        {pages.map((item, index) => {
          const zIndex = (index + 1)*5;
          // const transformData =
          //   index % 2
          //     ? `translatez(${zIndex * -1}px) scalex(-1) translatex(100%)`
          //     : `translatez(${zIndex * -1}px) `;
          //     // translate(${zIndex * 2}px, ${zIndex}px)
          // const transformOriginData = index % 2 ? `100% 50%` : `0% 50%`;

          return (
            <div
              key={index}
              onClick={(e) => {
                if (!(index % 2)) {
                  e.target.animate(
                    [
                      {
                        transform: `translate3d(0,0,${
                          zIndex * -1
                        }px) rotateY(0deg)`,
                      },
                      {
                        transform: `translate3d(0,0,${zIndex}px) rotateY(-180deg)`,
                      },
                    ],
                    {
                      duration: 1000,
                      iterations: 1,
                      fill: 'both',
                    }
                  );
                  e.target.nextElementSibling.animate(
                    [
                      {
                        transform: `translate3d(-100%,0,${
                        (  zIndex + 1)* -1
                        }px) rotateY(180deg)`,
                      },
                      {
                        transform: `translate3d(-100%,0,${
                          (zIndex + 1) 
                        }px) rotateY(0deg)`,
                      },
                    ],
                    {
                      duration: 1000,
                      iterations: 1,
                      fill: 'both',
                    }
                  );
                  return;
                }
                if (index % 2) {
                  e.target.animate(
                    [
                      {
                        transform: `translate3d(-100%,0,${
                          zIndex 
                        }px) rotateY(0)`,
                      },
                      {
                        transform: `translate3d(-100%,0,${zIndex* -1}px) rotateY(180deg)`,
                      },
                    ],
                    {
                      duration: 1000,
                      iterations: 1,
                      fill: 'both',
                    }
                  );
                  e.target.previousElementSibling.animate(
                    [
                      {
                        transform: `translate3d(0,0,${
                          (zIndex - 1) 
                        }px) rotateY(-180deg)`,
                      },
                      {
                        transform: `translate3d(0,0,${
                        (  zIndex - 1)* -1
                        }px) rotateY(0deg)`,
                      },
                    ],
                    {
                      duration: 1000,
                      iterations: 1,
                      fill: 'both',
                    }
                  );
                  return;
                }
                // if (index % 2) {
                //   e.target.style.transform = `translate3d(-100,0,${
                //     zIndex * -1
                //   }px) rotateY(-180deg)`;
                //   e.target.previousElementSibling.style.transform = `translate3d(0,0,${
                //     (zIndex - 1) * -1
                //   }px) rotateY(0)`;
                //   return;
                // }
                // e.target.style.transform = `translate3d(0,0,${zIndex}px) rotateY(180deg)`;

                // e.target.nextElementSibling.style.transform = `translate3d(-100%,0,${
                //   zIndex + 1
                // }px) rotateY(0deg)`;

                const curElementStyle = e.target;
                requestAnimationFrame(() => {
                  if (index % 2) {
                    console.log('2');
                    const prevElementStyle =
                      e.target.previousElementSibling.style;
                    curElementStyle.style.transform = `translate3d(-100%,0,${
                      zIndex * -1
                    }px) rotateY(180deg)`;
                    prevElementStyle.transform = `translate3d(0,0,${
                      (zIndex - 1) * -1
                    }px) rotateY(0)`;
                    return;
                  }
                  const nextElementStyle = e.target.nextElementSibling;
                  curElementStyle.style.transform = `translate3d(0,0,${
                    zIndex * -1
                  }px) rotateY(-180deg)`;

                  nextElementStyle.style.transform = `translate3d(-100%,0,${
                    zIndex + 1
                  }px) rotateY(0deg)`;
                });

                return;
              }}
              style={{
                backgroundColor: item,
                width: '15rem',
                height: '25rem',
                // boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                borderRadius:
                  index % 2 ? '50px 22px 50px 23px' : '22px 50px 23px 50px',
                position: 'absolute',
                textAlign: 'center',
                left: '0',
                top: '0',
                transformStyle: 'preserve-3d',
                transition: 'all 2s ease',
                transformOrigin: !(index % 2) ? `0% 50%` : `100% 50%`,
                transform: !(index % 2)
                  ? `translate3d(0,0,${zIndex * -1}px) rotateY(0deg)`
                  : `translate3d(-100%,0,${zIndex * -1}px) rotateY(180deg)`,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BookLayout;

// if (index % 2) {
//   e.target.style.transform = `translatez(${
//     zIndex * -1
//   }px) scalex(-1) translatex(100%)`;
//   e.target.previousElementSibling.style.transform = `translatez(${
//     (zIndex - 1) * -1
//   }px)`;
//   return;
// }
// index % 2
//   ? (e.target.style.transform = `translatez(${zIndex}px) scalex(-1) translatex(100%) rotatey(180deg)`)
//   : (e.target.style.transform = `translatez(${zIndex}px) rotatey(-180deg)`);

// index % 2
//   ? (e.target.nextElementSibling.style.transform = `translatez(${
//       zIndex + 1
//     }px) rotatey(-180deg)`)
//   : (e.target.nextElementSibling.style.transform = `translatez(${
//       zIndex + 1
//     }px) scalex(-1) translatex(100%) rotatey(180deg)`);
