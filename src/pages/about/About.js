export default function AboutPage() {
  return (
    <div>about page</div>
  );
}

purposebox = document.getElementById("purpose-box");
purposebox.addEventListener("resize", () => {
  if (purposebox.style.width === 400) {
    purposebox.style.flexDirection = "column";
  }
})