export function activeItemOnScroll(
  items: NodeListOf<Element>,
  sections: NodeListOf<Element>,
  
  intersectionObserverOption: IntersectionObserverInit
) {
  const callback: IntersectionObserverCallback = (entries, obs)=> {
    entries.forEach((entry, index) => {
      const { isIntersecting, target } = entry;
  
      if(isIntersecting) {      
        var elementId = target.getAttribute("id");
        
        items.forEach(item => {
          var corresponding = item.querySelector("a").getAttribute("href").replace("#", "") == elementId;

          item.classList.remove("active");
          
          if(corresponding) {
            item.classList.add("active");
          }
        })
      }
    })
  }

  const observer = new IntersectionObserver(callback, intersectionObserverOption);

  sections.forEach(entry => {
    observer.observe(entry);
  });
};