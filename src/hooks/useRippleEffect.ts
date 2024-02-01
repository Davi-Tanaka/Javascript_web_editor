import RippleStyles from "@styles/utils/modules/RippleEffect.module.scss";

function useRippleEffect(event: MouseEvent, durationInMiliseconds) {
  const target = event.currentTarget as HTMLButtonElement;
  const animationTime = durationInMiliseconds;
  const rect = target.getBoundingClientRect();

  const click = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }

  const rippleSpan = document.createElement('span');
  rippleSpan.classList.add(RippleStyles.ripple);
  
  rippleSpan.style.cssText += `
    animation: ${RippleStyles.rippleEffect} ${animationTime}ms forwards !important;
    left: ${click.x}px;
    top: ${click.y}px;
    
    transform: translate(-50%, -50%);
  `
    
  target.appendChild(rippleSpan);
  
  setTimeout(() => {
    rippleSpan.remove();
  }, animationTime)
}


export { useRippleEffect }