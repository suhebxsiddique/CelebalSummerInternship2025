import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function Body() {
  return (
    <>
      <div
        class="offcanvas offcanvas-start w-25 bg-black text-white"
        tabindex="-1"
        id="offcanvas"
        data-bs-keyboard="false"
        data-bs-backdrop="false"
      >
        <div class="offcanvas-header">
          <h6 class="offcanvas-title d-none d-sm-block mt-4" id="offcanvas">
            Sidebar Menu
          </h6>
          <button
            type="button"
            class="btn-close btn-close-white text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body px-0">
          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu"
          >
            <li class="nav-item">
              <a href="#" class="nav-link text-truncate">
                <span class="ms-1 d-none d-sm-inline">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#submenu1"
                data-bs-toggle="collapse"
                class="nav-link text-truncate"
              >
                <span class="ms-1 d-none d-sm-inline">About</span>{" "}
              </a>
            </li>

            <li>
              <a href="#" class="nav-link text-truncate">
                <i class="fs-5 bi-grid"></i>
                <span class="ms-1 d-none d-sm-inline">Contact</span>
              </a>
            </li>
            <li>
              <a href="#" class="nav-link text-truncate">
                <i class="fs-5 bi-people"></i>
                <span class="ms-1 d-none d-sm-inline">Projects</span>{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col min-vh-100 p-0">
            <Header />
            <Content />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
