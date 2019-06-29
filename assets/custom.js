$(document).ready(function(){

			$.ajax({
			  method: "GET",
			  url: "/genesis"
			})
			.done(function( data ) {
			    $('.nonce').val(data.nonce);
			    $('.data').val(data.data);
			    $('.prev').val(data.prev);
			    $('.hash').val(data.hash);
			});

			$('#add_new_block').on('click', () => {
				console.log($('#add_new_block').prev().find('.block').val());
				
				$.ajax({
				  method: "POST",
				  url: "/hash",
				  data: { value:
				  			$('#add_new_block').prev().find('.nonce').val() +
						    $('#add_new_block').prev().find('.data').val()  +
						    $('#add_new_block').prev().find('.prev').val()  +
						    $('#add_new_block').prev().find('.hash').val() 
						}
				})
				.done(function( data ) {
				    addnewblock(data.hash)
				});

				function addnewblock(hash) {
					$.ajax({
					  method: "POST",
					  url: "/addnewblock",
					  data: {  
					  			block: $('#add_new_block').prev().find('.block').val(),
						     	prev: $('#add_new_block').prev().find('.hash').val(),
								nonce: $('#add_new_block').prev().find('.nonce').val(),
						    	data: $('#add_new_block').prev().find('.data').val(),
						    	hash: hash
 						}
					})
					.done(function( data ) {
						console.log(data);
					    $(`
							<div class="card mt-4">
							  <div class="card-body">
							    <h5 class="card-title">Chain Block</h5>
							    <form>
									<div class="form-group row">
										<label class="col-sm-2 col-form-label">Block</label>
									      <div class="col-sm-10 input-group mb-2">
									        <div class="input-group-prepend">
									          <div class="input-group-text">#</div>
									        </div>
									        <input id="block" type="text" class="block form-control" placeholder="0" value="${data.block}">
									      </div>
									</div>
									<div class="form-group row">
										<label for="nonce" class="col-sm-2 col-form-label">nonce</label>
										<div class="col-sm-10">
										  <input type="number" class="form-control nonce" id="nonce" placeholder="00" value="${data.nonce}">
										</div>
									</div>
									<div class="form-group row">
										<label for="data" class="col-sm-2 col-form-label">data</label>
										<div class="col-sm-10">
										  <textarea class="form-control data" rows="5" id="data" placeholder="">${data.data}</textarea>
										</div>
									</div>
									<div class="form-group row">
										<label for="prev" class="col-sm-2 col-form-label">prev</label>
										<div class="col-sm-10">
										  <input type="text" class="form-control prev" readonly id="prev" placeholder="0000" value="${data.prev}">
										</div>
									</div>
									<div class="form-group row">
										<label for="hash" class="col-sm-2 col-form-label">hash</label>
										<div class="col-sm-10">
										  <input type="text" readonly class="form-control hash" id="hash" placeholder="0000" value="${data.hash}">
										</div>
									</div>
								</form>
							  </div>
							</div>
					    	`).insertBefore('#add_new_block');
					});
				}

			});

		

    	});