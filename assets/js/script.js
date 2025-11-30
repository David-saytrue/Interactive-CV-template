const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

// თემის შემოწმება ჩატვირთვისას
if (currentTheme) {
  document.body.classList.add(currentTheme);
  if (currentTheme === "dark-theme") {
    toggleSwitch.checked = true;
  }
}

// თემის შეცვლის ფუნქცია
function switchTheme(e) {
  if (e.target.checked) {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light-theme");
  }
}

toggleSwitch.addEventListener("change", switchTheme);

/* --- წრეების ანიმაცია (Progress Circle Animation) --- */
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");

  // ფუნქცია ანიმაციისთვის
  const animateCircle = (circle) => {
    // ვიღებთ სამიზნე რიცხვს data-val ატრიბუტიდან (მაგ: 95)
    const targetVal = parseInt(circle.getAttribute("data-val"));
    let currentVal = 0;

    // ანიმაციის სისწრაფე
    const duration = 1500; // 1.5 წამი
    const intervalTime = 20;
    const step = targetVal / (duration / intervalTime);

    const timer = setInterval(() => {
      currentVal += step;

      if (currentVal >= targetVal) {
        currentVal = targetVal;
        clearInterval(timer);
      }

      // CSS ცვლადის განახლება, რაც ცვლის გრადიენტს
      circle.style.setProperty("--val", currentVal);
    }, intervalTime);
  };

  // Intersection Observer - ანიმაცია იწყება მხოლოდ მაშინ, როცა ელემენტი ეკრანზე გამოჩნდება
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCircle(entry.target);
          observer.unobserve(entry.target); // ანიმაცია მხოლოდ ერთხელ მოხდეს
        }
      });
    },
    { threshold: 0.5 }
  );

  circles.forEach((circle) => {
    observer.observe(circle);
  });
});
