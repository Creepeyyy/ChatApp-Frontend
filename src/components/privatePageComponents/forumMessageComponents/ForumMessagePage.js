import React from 'react'
import { useParams } from 'react-router-dom'

function ForumMessagePage() {
  const { id } = useParams();

  return (
    <div class="container-fluid" id="messageContainer">
      <div class="row row-cols-1 row-cols-lg-3">
        <div class="col mb-2 mb-lg-0 order-1 order-lg-0 d-flex flex-column justify-content-center">
          <div class="d-flex flex-row justify-content-lg-start justify-content-center">
            <button id="popover-btn" type="button" class="btn bg-primary text-white">Create Message</button>
          </div>
        </div>
        <div class="col order-first order-lg-1 text-white text-center">
          <h1>Forumname</h1>
        </div>
        <div class="col order-last d-flex flex-column justify-content-center">
          <div className="d-flex flex-row justify-content-lg-end justify-content-center">
            <button id="popover-btn" type="button" class="btn text-white" data-bs-toggle="popover"
              data-bs-placement="bottom" title="Forumname by Author"
              data-bs-content="ForumDescription: And here's some amazing content. It's very engaging. Right?">About
              Forum</button>
          </div>
        </div>
      </div>
      <div class="card w-100 text-white" id="message">
        <div class="card-header d-flex justify-content-between" id="messageheader">
          <h4 id="username">Username</h4>
          <div class="d-flex flex-row flex-nowrap ">
            <p class="px-3">Today, 3:47 PM</p>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle dropdown-toggle-split" type="button"
                id="message-dropdown" data-bs-toggle="dropdown">
              </button>
              <ul class="dropdown-menu" aria-labelledby="message-dropdown">
                <li><a class="dropdown-item" href="*">Update Message</a></li>
                <li><a class="dropdown-item" href="*">Delete Message</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet soluta fuga
            nesciunt ipsam. Vero, distinctio fugiat quibusdam architecto molestias quisquam ex, nesciunt
            facere id mollitia qui officiis pariatur eos, ea ipsum unde aliquid! Unde quasi magnam quod.
            Iusto quis, ad maiores hic tempora numquam corrupti cum. Consectetur, vero maxime! Natus
            obcaecati corporis accusantium dolores.</p>
        </div>
      </div>
      <div class="card w-100 text-white" id="message">
        <div class="card-header d-flex justify-content-between" id="messageheader">
          <h4 id="username">Username</h4>
          <div class="d-flex flex-row flex-nowrap ">
            <p class="px-3">Today, 3:47 PM</p>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle dropdown-toggle-split" type="button"
                id="message-dropdown" data-bs-toggle="dropdown">
              </button>
              <ul class="dropdown-menu" aria-labelledby="message-dropdown">
                <li><a class="dropdown-item" href="*">Update Message</a></li>
                <li><a class="dropdown-item" href="*">Delete Message</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet soluta fuga
            nesciunt ipsam. Vero, distinctio fugiat quibusdam architecto molestias quisquam ex, nesciunt
            facere id mollitia qui officiis pariatur eos, ea ipsum unde aliquid! Unde quasi magnam quod.
            Iusto quis, ad maiores hic tempora numquam corrupti cum. Consectetur, vero maxime! Natus
            obcaecati corporis accusantium dolores.</p>
        </div>
      </div>

      <div class="d-flex flex-row justify-content-center" id="sendbar">
        <div class="col form-floating text-white">
          <input type="text" class="form-control" id="messageTitle" placeholder="MessageTitle" />
          <label for="messageTitle">Title</label>
        </div>
        <div class="col-8 " id="aa">
          <div class="d-flex">
            <div class="form-floating text-white flex-grow-1" id="messageContent">
              <textarea class="form-control" placeholder="Your text"
                id="messageText"></textarea>
              <label for="messageText">Content</label>
            </div>
            <button class="btn btn-primary" id="send">
              <i class="bi bi-arrow-90deg-right"></i>
            </button>
          </div>
        </div>
      </div >
    </div >
  )
}

export default ForumMessagePage