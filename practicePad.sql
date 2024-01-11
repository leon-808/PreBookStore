CREATE DEFINER=`root`@`localhost` PROCEDURE `checkExistCurrentOrder`(
	in p_user_id varchar(20)
)
begin
	declare v_orders_is_current int;
    
    select count(*) into v_orders_is_current
    from orders
    where user_id = p_user_id
    and is_current = true;
    
    if v_orders_is_current = 1 then
		signal sqlState '45000'
        set message_text = '진행중인 주문이 있어서 주문하실 수 없습니다. 해당 주문을 먼저 처리해주세요.';
	end if;
end