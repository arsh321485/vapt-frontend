<template>
    <main>
    <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
        <!-- <a class="navbar-brand text-white me-5" href="#">VaptFix</a> -->
         <img src="../assets/images/logo1.png" class="me-5" alt="logo">
    
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarNav">
        <!-- Left nav links -->
        <ul class="navbar-nav me-auto gap-4">
            <li class="nav-item">
            <a class="nav-link active text-white" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
            <a class="nav-link text-white" href="#">Features</a>
            </li>
            <li class="nav-item">
            <a class="nav-link text-white" href="#">Pricing</a>
            </li>
            <li class="nav-item">
            <a class="nav-link text-white" href="#">Partners</a>
            </li>
            <li class="nav-item">
            <a class="nav-link text-white" href="#">Vulnerability Explorer</a>
            </li>
        </ul>

        <!-- Right-aligned button -->
        <!-- <button class="btn text-white navbar-btn">Fix Your Vulnerabilities Now <i class="bi bi-arrow-right-circle-fill ms-1"></i></button> -->
        <router-link to="/location" class="btn text-white navbar-btn" tag="button">
  Fix Your Vulnerabilities Now 
  <i class="bi bi-arrow-right-circle-fill ms-1"></i>
</router-link>
        </div>
    </div>
    </nav>
    </main>
</template>

<script>
export default {
  name: 'Header',
};
</script>



